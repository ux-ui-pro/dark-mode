export function ThemeSwitcher() {

    const toggleButton = document.querySelector('.switch-theme'),
        themeTextMap = {'dark': 'Light Mode', 'light': 'Dark Mode'},
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

    window.onload = function() {
        init()
    }

    const metaTheme = document.createElement('meta')
    metaTheme.name = 'theme-color'
    document.head.appendChild(metaTheme)

    function applyTheme() {
        let dataTheme = currentTheme
        if (dataTheme === null) {
            dataTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }

        document.documentElement.setAttribute('data-theme', 'theme-' + dataTheme)

        metaTheme.content = window.metaColors[dataTheme].trim()

        toggleButton.setAttribute('aria-label', themeTextMap[currentTheme])
        toggleButton.classList.remove('dark-mode', 'light-mode')
        toggleButton.classList.add(dataTheme + '-mode')

        const spotLightMode = document.querySelector('.spot-light-mode'),
            spotDarkMode = document.querySelector('.spot-dark-mode'),
            haloLightMode = document.querySelector('.halo-light-mode'),
            haloDarkMode = document.querySelector('.halo-dark-mode')

        if (toggleButton.classList.contains('light-mode')) {
            spotLightMode.beginElement()
            haloLightMode.beginElement()
        } else if (toggleButton.classList.contains('dark-mode')) {
            spotDarkMode.beginElement()
            haloDarkMode.beginElement()
        }
    }

    toggleButton.addEventListener('click', () => {
        doToggle()
    })

}


