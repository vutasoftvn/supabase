import { ThirdPartyAuthIntegration } from 'data/third-party-auth/integrations-query'
import { BASE_PATH } from 'lib/constants'

export const INTEGRATION_TYPES = [
  'firebase',
  'auth0',
  'awsCognito',
  'clerk',
  'workos',
  'custom',
] as const
export type INTEGRATION_TYPES = (typeof INTEGRATION_TYPES)[number]

export const getIntegrationType = (integration?: ThirdPartyAuthIntegration): INTEGRATION_TYPES => {
  if (integration?.type === 'workos') {
    return 'workos'
  }

  // TODO(hf): Move these to check type as well.
  if (integration?.oidc_issuer_url?.startsWith('https://securetoken.google.com/')) {
    return 'firebase'
  }

  if (integration?.oidc_issuer_url?.includes('amazonaws.com')) {
    return 'awsCognito'
  }

  if (integration?.oidc_issuer_url?.includes('auth0.com')) {
    return 'auth0'
  }

  if (
    integration?.oidc_issuer_url?.includes('.clerk.accounts.dev') ||
    integration?.oidc_issuer_url?.startsWith('https://clerk.')
  ) {
    return 'clerk'
  }

  return 'custom'
}

export const getIntegrationTypeLabel = (type: INTEGRATION_TYPES) => {
  switch (type) {
    case 'firebase':
      return 'Firebase'
    case 'auth0':
      return 'Auth0'
    case 'awsCognito':
      return 'Amazon Cognito'
    case 'clerk':
      return 'Clerk'
    case 'workos':
      return 'WorkOS'
    case 'custom':
    default:
      return 'Custom'
  }
}

export const getIntegrationTypeIcon = (type: INTEGRATION_TYPES) => {
  switch (type) {
    case 'firebase':
      return `${BASE_PATH}/img/icons/firebase-icon.svg`
    case 'auth0':
      return `${BASE_PATH}/img/icons/auth0-icon.svg`
    case 'awsCognito':
      return `${BASE_PATH}/img/icons/cognito-icon.svg`
    case 'clerk':
      return `${BASE_PATH}/img/icons/clerk-icon.svg`
    case 'workos':
      return `${BASE_PATH}/img/icons/workos-icon.svg`

    case 'custom':
    default:
      return `${BASE_PATH}/img/icons/cognito-icon.svg`
  }
}
