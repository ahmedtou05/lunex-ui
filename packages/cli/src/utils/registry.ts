import fetch from "node-fetch"

const REGISTRY_URL =
  "https://raw.githubusercontent.com/yourname/lunex-ui/main/packages/registry/registry.built.json"

export interface ComponentFile {
  name: string
  path: string
  content: string
}

export interface RegistryComponent {
  name: string
  description: string
  dependencies: string[]
  files: ComponentFile[]
}

export interface Registry {
  version: string
  components: RegistryComponent[]
}

export async function fetchRegistry(): Promise<Registry> {
  const res = await fetch(REGISTRY_URL)
  if (!res.ok) throw new Error(`Failed to fetch registry: ${res.statusText}`)
  return res.json() as Promise<Registry>
}

export async function fetchComponent(
  name: string
): Promise<RegistryComponent | null> {
  const registry = await fetchRegistry()
  return registry.components.find((c) => c.name === name) ?? null
}