import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
const Section = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (_jsxs(View, Object.assign({ style: styles.sectionContainer }, { children: [_jsx(Text, Object.assign({ style: [
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ] }, { children: title }), void 0), _jsx(Text, Object.assign({ style: [
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ] }, { children: children }), void 0)] }), void 0));
};
const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (_jsxs(SafeAreaView, Object.assign({ style: backgroundStyle }, { children: [_jsx(StatusBar, { barStyle: isDarkMode ? 'light-content' : 'dark-content' }, void 0), _jsxs(ScrollView, Object.assign({ contentInsetAdjustmentBehavior: "automatic", style: backgroundStyle }, { children: [_jsx(Header, {}, void 0), _jsxs(View, Object.assign({ style: {
                            backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        } }, { children: [_jsxs(Section, Object.assign({ title: "Step One" }, { children: ["Edit ", _jsx(Text, Object.assign({ style: styles.highlight }, { children: "App.js" }), void 0), " to change this screen and then come back to see your edits."] }), void 0), _jsx(Section, Object.assign({ title: "See Your Changes" }, { children: _jsx(ReloadInstructions, {}, void 0) }), void 0), _jsx(Section, Object.assign({ title: "Debug" }, { children: _jsx(DebugInstructions, {}, void 0) }), void 0), _jsx(Section, Object.assign({ title: "Learn More" }, { children: "Read the docs to discover what to do next:" }), void 0), _jsx(LearnMoreLinks, {}, void 0)] }), void 0)] }), void 0)] }), void 0));
};
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
export default App;
//# sourceMappingURL=App.js.map