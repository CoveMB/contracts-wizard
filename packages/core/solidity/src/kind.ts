import type { GenericOptions } from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    const sanitized = kind.replace(/^(ERC|.)/i, c => c.toUpperCase()).replace(/^(RealWorldAsset)$/i, 'RealWorldAsset');
    if (isKind(sanitized)) {
      return sanitized;
    }
  }
  return 'ERC20';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'ERC20':
    case 'ERC1155':
    case 'ERC721':
    case 'Stablecoin':
    case 'RealWorldAsset':
    case 'Account':
    case 'Governor':
    case 'Custom':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
