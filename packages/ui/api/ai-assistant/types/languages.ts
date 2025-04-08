// Solidity
import type { KindedOptions as SolidityKindedOptions } from '../../../../core/solidity/dist';
export type { CommonOptions as SolidityCommonOptions } from '../../../../core/solidity/dist/common-options';
// Cairo
import type { KindedOptions as CairoKindedOptions } from '../../../../core/cairo/dist';
export type { CommonContractOptions as CairoCommonContractOptions } from '../../../../core/cairo/dist/common-options';
export type { RoyaltyInfoOptions as CairoRoyaltyInfoOptions } from '../../../../core/cairo/dist/set-royalty-info';
// Cairo-alpha
import type { KindedOptions as CairoAlphaKindedOptions } from '../../../../core/cairo_alpha/dist';
export type { CommonContractOptions as CairoAlphaCommonContractOptions } from '../../../../core/cairo_alpha/dist/common-options';
export type { RoyaltyInfoOptions as CairoAlphaRoyaltyInfoOptions } from '../../../../core/cairo_alpha/dist/set-royalty-info';

// Add supported language here
export type LanguagesContractsOptions = {
  solidity: Omit<SolidityKindedOptions, 'Stablecoin' | 'RealWorldAsset'> & {
    Stablecoin: Omit<SolidityKindedOptions['Stablecoin'], 'upgradeable'> & { upgradeable?: false };
    RealWorldAsset: Omit<SolidityKindedOptions['RealWorldAsset'], 'upgradeable'> & { upgradeable?: false };
  };
  cairo: CairoKindedOptions;
  'cairo-alpha': CairoAlphaKindedOptions;
};

export type AllLanguagesContractsOptions = LanguagesContractsOptions['solidity'] &
  LanguagesContractsOptions['cairo'] &
  LanguagesContractsOptions['cairo-alpha'];
//

export type SupportedLanguage = keyof LanguagesContractsOptions;

export type LanguageContractsOptions<TLanguage extends SupportedLanguage> = LanguagesContractsOptions[TLanguage];

export type AllLanguageContractsNames = AllLanguagesContractsOptions[keyof AllLanguagesContractsOptions]['kind'];

type ExtractKind<T> = T extends { kind: infer K } ? K : never;

export type LanguageContractsNames<TLanguage extends SupportedLanguage> = ExtractKind<
  LanguageContractsOptions<TLanguage>[keyof LanguageContractsOptions<TLanguage>]
>;
