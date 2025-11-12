import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), '.accounts.json')

export type Account = {
  id: string
  username: string
  apiKey?: string
  createdAt: string
}

let accounts: Account[] = []

function load() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      accounts = JSON.parse(raw)
    }
  } catch (e) {
    console.error('Failed to load accounts', e)
    accounts = []
  }
}

function save() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(accounts, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to save accounts', e)
  }
}

load()

export function listAccounts() {
  return accounts
}

export function addAccount(a: Omit<Account, 'id' | 'createdAt'>) {
  const acc: Account = {
    ...a,
    id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
  }
  accounts.push(acc)
  save()
  return acc
}

export function removeAccount(id: string) {
  accounts = accounts.filter((a) => a.id !== id)
  save()
}

export function clearAccounts() {
  accounts = []
  save()
}
