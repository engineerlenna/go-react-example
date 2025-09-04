import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/welcone/')({
    component: App,
})

function App() {
    return (
        <>Welcome</>
    )
}
