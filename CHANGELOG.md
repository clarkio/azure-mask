# Azure Mask Changelog

## 1.1.10 (2021-08-07)

### Added

- Support for Azure Data Portal (adf.azure.com) (Thanks to @jiyongseong in [#70](https://github.com/clarkio/azure-mask/pull/70) and [#71](https://github.com/clarkio/azure-mask/pull/71))

### Fixed

- Support for azure.us (Thanks to @husamhilal in [#72](https://github.com/clarkio/azure-mask/pull/72))

## 1.1.8 (2021-04-17)

### Added

- Hiding of sensitive data in QnA maker portal (Thanks to @taqabubaker in [#63](https://github.com/clarkio/azure-mask/pull/63))

## 1.1.7 (2021-04-17)

### Added

- Email masking in account/user drop-down menu (Thanks to @
  mhdbouk in [#65](https://github.com/clarkio/azure-mask/pull/65))

## 1.1.6 (2021-04-17)

### Added

- Avatar masking (Thanks to @sinedied in [#67](https://github.com/clarkio/azure-mask/pull/67))

## 1.1.5 (2019-04-22)

### Changed

- Name to "Az Mask" as "Azure Mask" was taken down due to trademark infringement ("Azure")
- Regex used to find sensitive data to the simplified version looking for text with a signature following the Subscription ID pattern

### Added

- Ability to hide tooltips/title attribute for masked elements using css `pointer-events: none;`

<a name="1.1.4"></a>

## 1.1.4 (2018-08-15)

### Added

- Add support for government portal URLs [#44](https://github.com/clarkio/azure-mask/pull/44)
