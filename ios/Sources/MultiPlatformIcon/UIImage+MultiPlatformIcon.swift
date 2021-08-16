// This file is generated!

import UIKit

// Get the current bundle:
// https://forums.swift.org/t/unable-to-find-bundle-in-package-target-tests-when-package-depends-on-another-package-containing-resources-accessed-via-bundle-module/43974/5
private class CurrentBundleFinder {}

public extension UIImage {
    static let iconBundle = Bundle(for: CurrentBundleFinder.self)
    
    convenience init(icon multiPlatformIconAsset: MultiPlatformIconAsset) {
        print("Debug!!!", UIImage.iconBundle, multiPlatformIconAsset.resourceString, CurrentBundleFinder.self)
        
        self.init(
            named: multiPlatformIconAsset.resourceString,
            in: UIImage.iconBundle,
            compatibleWith: nil
            )!
  }
}
