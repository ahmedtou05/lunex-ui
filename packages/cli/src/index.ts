#!/usr/bin/env node
import { Command } from "commander"
import { initCommand } from "./commands/init"
import { addCommand } from "./commands/add"

const program = new Command()

program
  .name("lunex-ui")
  .description("Add Lunex UI components to your project")
  .version("1.0.0")

program
  .command("init")
  .description("Initialize lunex-ui in your project")
  .action(initCommand)

program
  .command("add <component>")
  .description("Add a component to your project")
  .option("-p, --path <path>", "destination path", "./components/ui")
  .action(addCommand)

program.parse()