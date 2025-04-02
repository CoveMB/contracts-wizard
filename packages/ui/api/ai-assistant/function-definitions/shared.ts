import type { AiFunctionPropertyDefinition } from '../types/function-definition.ts';
import type { SolidityCommonOptions, AllLanguageContractOptions } from '../types/languages.ts';

export const commonFunctionDescription = {
  access: {
    anyOf: [
      { type: 'boolean', enum: [false] },
      { type: 'string', enum: ['ownable', 'roles', 'managed'] },
    ],
    description:
      'The type of access control to provision. Ownable is a simple mechanism with a single account authorized for all privileged actions. Roles is a flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts. Managed enables a central contract to define a policy that allows certain callers to access certain functions.',
  },

  upgradeable: {
    anyOf: [
      { type: 'boolean', enum: [false] },
      { type: 'string', enum: ['transparent', 'uups'] },
    ],
    description:
      'Whether the smart contract is upgradeable. Transparent uses more complex proxy with higher overhead, requires less changes in your contract.Can also be used with beacons. UUPS uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades.',
  },

  info: {
    type: 'object',
    description: 'Metadata about the contract and author',
    properties: {
      securityContact: {
        type: 'string',
        description:
          'Email where people can contact you to report security issues. Will only be visible if contract metadata is verified.',
      },
      license: {
        type: 'string',
        description: 'The license used by the contract, default is "MIT"',
      },
    },
  },
} as const satisfies AiFunctionPropertyDefinition<SolidityCommonOptions>['properties'];

const sharedFunctionDescription = {
  name: { type: 'string', description: 'The name of the contract' },

  symbol: { type: 'string', description: 'The short symbol for the token' },

  burnable: {
    type: 'boolean',
    description: 'Whether token holders will be able to destroy their tokens',
  },

  pausable: {
    type: 'boolean',
    description:
      'Whether privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.',
  },

  mintable: {
    type: 'boolean',
    description: 'Whether privileged accounts will be able to create more supply or emit more tokens',
  },
} as const;

type SharedFunctionDescription = typeof commonFunctionDescription & typeof sharedFunctionDescription;

export const addFunctionProperties = <
  TCommonOptionName extends keyof SharedFunctionDescription = keyof SharedFunctionDescription,
>(
  commonOptionNames: TCommonOptionName[],
) =>
  commonOptionNames.reduce(
    (pickedCommonOptions, commonOptionName) => ({
      ...pickedCommonOptions,
      [commonOptionName]: { ...commonFunctionDescription, ...sharedFunctionDescription }[commonOptionName],
    }),
    {} as Pick<SharedFunctionDescription, TCommonOptionName>,
  );
