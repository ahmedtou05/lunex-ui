import fs from "fs"
import path from "path"
import chalk from "chalk"
import ora from "ora"
import { fetchComponent } from "../utils/registry"
import { execSync } from "child_process"

export async function addCommand(
  componentName: string,
  options: { path: string }
) {
  const spinner = ora(`Fetching ${componentName}...`).start()

  const component = await fetchComponent(componentName)

  if (!component) {
    spinner.fail(chalk.red(`Component "${componentName}" not found in registry`))
    console.log(chalk.gray("Run `lunex-ui list` to see available components"))
    process.exit(1)
  }

  spinner.text = `Installing ${componentName}...`

  // Create destination directory
  const destDir = options.path
  fs.mkdirSync(destDir, { recursive: true })

  // Write component files
  for (const file of component.files) {
    const destPath = path.join(destDir, file.name)
    fs.writeFileSync(destPath, file.content, "utf-8")
    spinner.text = `Written: ${destPath}`
  }

  // Install dependencies
  if (component.dependencies.length > 0) {
    spinner.text = `Installing dependencies: ${component.dependencies.join(", ")}`
    execSync(`npm install ${component.dependencies.join(" ")}`, {
      stdio: "ignore",
    })
  }

  spinner.succeed(
    chalk.green(`✓ Added ${componentName} to ${destDir}`)
  )

  // Post-install message
  console.log(
    chalk.gray(
      `\nImport it with: import { ${toPascalCase(componentName)} } from "@/components/ui/${componentName}"`
    )
  )
}

function toPascalCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}