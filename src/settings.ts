import { name as pkgName, version as pkgVersion } from '@@/package.json'

export const name = pkgName.split('-').shift() || pkgName
export const version = pkgVersion

export const errorColor = '#e32636'
export const successColor = '#0eb879'