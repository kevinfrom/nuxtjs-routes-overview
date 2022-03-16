import {resolve} from 'path'
import {writeFile} from 'fs/promises'

export default function nuxtRoutesOverview() {
    const routesMap = {}

    const setValueFromPath = (path, currentPosition) => {
        const first = path.shift()
        if (!first) return
        if (typeof currentPosition[first] === 'undefined') currentPosition[first] = {}
        if (path.length !== 0) setValueFromPath(path, currentPosition[first])
    }

    this.nuxt.hook('generate:done', async generator => {
        const {dir} = generator.nuxt.options.generate
        const {generatedRoutes} = generator

        generatedRoutes.forEach(route => {
            route = route.replace(/^\/|\/$/g, '')
            const routeParts = route.split('/')

            setValueFromPath(routeParts, routesMap)
        })

        const path = resolve(dir, '_routes-map.json')
        await writeFile(path, JSON.stringify(routesMap, null, 4))
        console.log('[nuxtjs-routes-overview]', `Generated routes map at: ${path}`)
    })
}
