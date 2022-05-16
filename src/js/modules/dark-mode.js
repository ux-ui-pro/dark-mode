export function ThemeSwitcher() {

    const toggleButton = document.querySelector('.js-switch-theme'),
        themeTextMap = {'dark': 'Dark Mode', 'light': 'Light Mode'},
        bodyStyles = window.getComputedStyle(document.body)

    let barThemeDark = bodyStyles.getPropertyValue('--theme-dark'),
        barThemeLight = bodyStyles.getPropertyValue('--theme-light'),
        currentTheme = null

    window.metaColors = {
        'dark': barThemeDark,
        'light': barThemeLight
    }

    function doToggle() {
        const themeKeys = Object.keys(themeTextMap)
        currentTheme = themeKeys[(themeKeys.indexOf(currentTheme) + 1) % themeKeys.length]
        localStorage.setItem('savedColorScheme', currentTheme)
        applyTheme()
    }

    function init() {
        currentTheme = localStorage.getItem('savedColorScheme') || 'dark'
        applyTheme()
    }

    init()

    function applyTheme() {
        let dataTheme = currentTheme
        if (dataTheme === null) {
            dataTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        document.documentElement.setAttribute('data-theme', 'theme-' + dataTheme)
        document.querySelector('meta[name="theme-color"]').setAttribute('content', window.metaColors[dataTheme])
        toggleButton.classList.remove('dark-mode', 'light-mode')
        toggleButton.classList.add(dataTheme + '-mode')
    }

    toggleButton.addEventListener('click', () => {
        doToggle()
    })

}


