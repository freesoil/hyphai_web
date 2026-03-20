#!/usr/bin/env python3
import os
import subprocess
import sys
import readline
from pathlib import Path

HISTORY_PATH = Path(".run_history")
CMD_HISTORY_PATH = Path(".run_command_history")
HISTORY_MAX = 1000
CMD_HISTORY_MAX = 100


def color(code):
    return f"\033[{code}m"


CLR_RESET = color("0")
CLR_BOLD = color("1")
CLR_DIM = color("2")
CLR_RED = color("31")
CLR_GREEN = color("32")
CLR_YELLOW = color("33")
CLR_BLUE = color("34")
CLR_CYAN = color("36")


def load_history():
    try:
        readline.read_history_file(HISTORY_PATH)
    except FileNotFoundError:
        pass
    readline.set_history_length(HISTORY_MAX)


def save_history():
    try:
        readline.set_history_length(HISTORY_MAX)
        readline.write_history_file(HISTORY_PATH)
    except Exception:
        pass


def print_box(title, body):
    lines = body.splitlines() or [""]
    width = max(len(title), *(len(l) for l in lines)) + 4
    print(CLR_DIM + "+" + "-" * (width - 2) + "+" + CLR_RESET)
    print(CLR_DIM + "| " + CLR_RESET + CLR_BOLD + title.ljust(width - 4) + CLR_RESET + CLR_DIM + " |" + CLR_RESET)
    print(CLR_DIM + "+" + "-" * (width - 2) + "+" + CLR_RESET)
    for line in lines:
        print(CLR_DIM + "| " + CLR_RESET + line.ljust(width - 4) + CLR_DIM + " |" + CLR_RESET)
    print(CLR_DIM + "+" + "-" * (width - 2) + "+" + CLR_RESET)


command_history = []


def load_command_history():
    if CMD_HISTORY_PATH.exists():
        try:
            lines = CMD_HISTORY_PATH.read_text().splitlines()
            command_history.extend(lines[-CMD_HISTORY_MAX:])
        except Exception:
            pass


def save_command_history():
    try:
        trimmed = command_history[-CMD_HISTORY_MAX:]
        CMD_HISTORY_PATH.write_text("\n".join(trimmed) + ("\n" if trimmed else ""))
    except Exception:
        pass


def run_shell_command(cmd):
    print(CLR_CYAN + f"$ {cmd}" + CLR_RESET)
    result = subprocess.run(cmd, shell=True, text=True)
    status = "command completed" if result.returncode == 0 else f"command failed ({result.returncode})"
    print_box(status, "")
    command_history.append(cmd)
    save_command_history()
    return result.returncode


def prompt_input(prompt, default=None):
    suffix = f" {CLR_DIM}[default: {default}]{CLR_RESET}" if default else ""
    while True:
        try:
            value = input(f"{prompt}{suffix}\n> ").strip()
        except EOFError:
            print()
            sys.exit(1)
        if value.startswith("!"):
            cmd = value[1:].strip()
            if not cmd:
                continue
            run_shell_command(cmd)
            continue
        if not value and default is not None:
            return default
        if value:
            return value


def prompt_choice(title, options, default_key):
    print(CLR_BOLD + title + CLR_RESET)
    for key, label in options:
        marker = " (default)" if key == default_key else ""
        print(f"  {CLR_CYAN}{key}{CLR_RESET}. {label}{CLR_DIM}{marker}{CLR_RESET}")
    print(CLR_DIM + "Type the option number, or type a custom command." + CLR_RESET)
    while True:
        value = prompt_input("Choose an option", default=default_key)
        if value in dict(options):
            return ("option", value)
        return ("custom", value)


def build_web_commands(web_dir):
    opts = [
        ("1", "Install deps + run dev server (npm install, npm run dev)"),
        ("2", "Install deps + build + preview (npm install, npm run build, npm run preview)"),
        ("3", "Install deps + run tests (npm install, npm run test)"),
        ("4", "Skip local web test"),
    ]
    kind, val = prompt_choice("Web: local test", opts, "1")
    commands = []
    if kind == "option":
        if val == "1":
            commands.append(f"cd {web_dir} && npm install")
            commands.append(f"cd {web_dir} && npm run dev")
        elif val == "2":
            commands.append(f"cd {web_dir} && npm install")
            commands.append(f"cd {web_dir} && npm run build")
            commands.append(f"cd {web_dir} && npm run preview")
        elif val == "3":
            commands.append(f"cd {web_dir} && npm install")
            commands.append(f"cd {web_dir} && npm run test")
    else:
        commands.append(f"cd {web_dir} && {val}")
    return commands


def build_web_deploy_commands(web_dir):
    opts = [
        ("1", "Deploy to GitHub Pages with custom domain / root (npm run deploy:root) — for hyphai.us"),
        ("2", "Deploy to GitHub Pages subpath (npm run deploy) — for ...github.io/hyphai_web/ only"),
        ("3", "Skip web deploy"),
    ]
    kind, val = prompt_choice("Web: deploy", opts, "1")
    if kind == "option":
        if val == "1":
            return [f"cd {web_dir} && npm run deploy:root"]
        if val == "2":
            return [f"cd {web_dir} && npm run deploy"]
        return []
    return [f"cd {web_dir} && {val}"]


def build_api_commands(api_dir):
    opts = [
        ("1", "Start functions emulator (firebase emulators:start --only functions)"),
        ("2", "Open functions shell (firebase functions:shell)"),
        ("3", "Skip local API test"),
    ]
    kind, val = prompt_choice("API: local test", opts, "1")
    if kind == "option":
        if val == "1":
            return [f"cd {api_dir} && firebase emulators:start --only functions"]
        if val == "2":
            return [f"cd {api_dir} && firebase functions:shell"]
        return []
    return [f"cd {api_dir} && {val}"]


def build_api_deploy_commands(repo_root):
    opts = [
        ("1", "Deploy API (firebase deploy --only functions)"),
        ("2", "Skip API deploy"),
    ]
    kind, val = prompt_choice("API: deploy", opts, "1")
    if kind == "option":
        if val == "1":
            return [f"cd {repo_root} && firebase deploy --only functions"]
        return []
    return [f"cd {repo_root} && {val}"]


def show_config_summary(web_dir, api_dir):
    firebase_rc = Path(".firebaserc")
    project = "(not set)"
    if firebase_rc.exists():
        try:
            content = firebase_rc.read_text()
            project = "configured"
            if "default" in content:
                project = "default project set"
        except Exception:
            pass
    body = "\n".join(
        [
            f"Web dir: {web_dir}",
            f"API dir: {api_dir}",
            f"Firebase project: {project}",
            "Tip: type !<command> at any prompt to run a command.",
        ]
    )
    print_box("config summary", body)


def choose_workflow():
    items = [
        ("1", "web_local", "Web: local dev / build / test"),
        ("2", "web_deploy", "Web: deploy"),
        ("3", "api_local", "API: local test"),
        ("4", "api_deploy", "API: deploy"),
        ("5", "config", "Config: set web/api directories"),
    ]
    print(CLR_BOLD + "Select what you want to run:" + CLR_RESET)
    for key, _, label in items:
        print(f"  {CLR_CYAN}{key}{CLR_RESET}. {label}")
    print(CLR_DIM + "Enter comma-separated numbers (e.g., 1,4). Press Enter for none." + CLR_RESET)
    while True:
        raw = prompt_input("Your selection", default="")
        if not raw:
            return {k: False for _, k, _ in items}
        tokens = [t.strip() for t in raw.split(",") if t.strip()]
        if not tokens:
            return {k: False for _, k, _ in items}
        valid_keys = {key for key, _, _ in items}
        if all(t in valid_keys for t in tokens):
            selections = {k: False for _, k, _ in items}
            for key, k, _ in items:
                if key in tokens:
                    selections[k] = True
            return selections
        print(CLR_YELLOW + "Invalid selection. Use only the numbers shown." + CLR_RESET)


def main():
    load_history()
    load_command_history()
    try:
        repo_root = os.getcwd()
        print(CLR_BOLD + "Hyphai deployment assistant" + CLR_RESET)
        print(CLR_DIM + "Interactive workflow for web + API (Firebase Functions)." + CLR_RESET)

        web_dir = "web"
        api_dir = "api"

        show_config_summary(web_dir, api_dir)

        selections = choose_workflow()
        if selections.get("config"):
            web_dir = prompt_input("Web directory", default=web_dir)
            api_dir = prompt_input("API directory", default=api_dir)
            show_config_summary(web_dir, api_dir)

        commands = []
        if selections.get("web_local"):
            commands += build_web_commands(web_dir)
        if selections.get("web_deploy"):
            commands += build_web_deploy_commands(web_dir)
        if selections.get("api_local"):
            commands += build_api_commands(api_dir)
        if selections.get("api_deploy"):
            commands += build_api_deploy_commands(repo_root)

        if not commands:
            print(CLR_YELLOW + "No commands selected. Exiting." + CLR_RESET)
            return 0

        print(CLR_BOLD + "Planned commands:" + CLR_RESET)
        for i, cmd in enumerate(commands, 1):
            print(f"  {i}. {cmd}")
        if any("npm run dev" in c for c in commands):
            print(CLR_GREEN + "  → Then open http://localhost:5173 in your browser." + CLR_RESET)

        confirm = prompt_input("Run these commands now? (Y/n)", default="y").lower()
        if confirm not in ("y", "yes"):
            print(CLR_YELLOW + "Aborted by user." + CLR_RESET)
            return 0

        executed = []
        for cmd in commands:
            code = run_shell_command(cmd)
            executed.append(cmd)
            if code != 0:
                print(CLR_RED + f"Command failed with exit code {code}. Stopping." + CLR_RESET)
                break

        if executed:
            print(CLR_GREEN + "Done." + CLR_RESET)
        return 0
    finally:
        save_history()


if __name__ == "__main__":
    sys.exit(main())
