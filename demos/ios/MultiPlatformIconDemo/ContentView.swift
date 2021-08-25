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
                .padding(.bottom, 8)
            HStack(alignment: .top, spacing: 16) {
                ForEach(MultiPlatformIconAsset.allCases, id: \.self) { value in
                    VStack(alignment: .center, spacing: 4) {
                        Image(uiImage: UIImage(icon: value))
                            .renderingMode(.original)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 24, height: 24, alignment: .center)
                        Text(String(describing: value))
                            .font(.caption)
                    }
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
