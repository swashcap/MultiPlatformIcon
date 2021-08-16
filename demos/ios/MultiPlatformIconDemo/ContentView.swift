//
//  ContentView.swift
//  MultiPlatformIconDemo
//
//  Created by Cory Reed on 8/15/21.
//  Copyright © 2021 swashcap. All rights reserved.
//

import SwiftUI
import MultiPlatformIcon

struct ContentView: View {
    var body: some View {
        VStack {
            Text("MultiPlatformIconDemo")
            Image(uiImage: UIImage(icon: .arrowBottom))
                .frame(width: 24, height: 24, alignment: .center)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
