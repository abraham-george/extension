var appId = 'CIExtension';
var appVersion = '1.0.0';

ORACLE_SERVICE_CLOUD.extension_loader.load(
    appId,
    appVersion,
).then(function(extensionProvider: IExtensionProvider) {
    alert('Extension loaded successfully!');
})