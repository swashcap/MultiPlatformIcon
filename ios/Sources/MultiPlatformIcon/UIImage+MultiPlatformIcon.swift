import Foundation
import UIKit

public extension UIImage {
  convenience init(icon multiPlatformIconAsset: MultiPlatformIconAsset) {
    self.init(
      named: multiPlatformIconAsset.resourceString,
      in: Bundle.module,
      compatibleWith: nil
    )!
  }
}