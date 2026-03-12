import fs from "fs"
import chalk from "chalk"
import ora from "ora"

export async function initCommand() {
  const spinner = ora("Initializing Lunex UI...").start()

  // Check for tailwind.config
  const hasTailwind =
    fs.existsSync("tailwind.config.ts") ||
    fs.existsSync("tailwind.config.js")

  if (!hasTailwind) {
    spinner.warn(
      chalk.yellow("No tailwind.config found. Make sure Tailwind CSS is set up.")
    )
  }

  // Create lib/utils.ts if it doesn't exist
  if (!fs.existsSync("./lib/utils.ts")) {
    fs.mkdirSync("./lib", { recursive: true })
    fs.writeFileSync(
      "./lib/utils.ts",
      `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    )
    spinner.text = "Created lib/utils.ts"
  }

  // Create lunex.config.json
  fs.writeFileSync(
    "./lunex.config.json",
    JSON.stringify(
      {
        componentsDir: "./components/ui",
        utilsPath: "./lib/utils",
      },
      null,
      2
    )
  )

  spinner.succeed(chalk.green("Lunex UI initialized successfully"))
  console.log(chalk.gray('\nNext: run `npx lunex-ui add button` to add your first component'))
}