// This file is generated!

import UIKit

public extension UIImage {
  convenience init(multiPlatformIconAsset: MultiPlatformIconAsset) {
    self.init(named: multiPlatformIconAsset.resourceString)!
  }
}