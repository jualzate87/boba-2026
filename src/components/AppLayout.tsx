import { Outlet } from 'react-router-dom'
import NudgeBanner from './NudgeBanner'
import ScenarioSwitcher from './ScenarioSwitcher'

export default function AppLayout() {
  return (
    <div className="min-h-screen pb-14">
      <NudgeBanner />
      <main>
        <Outlet />
      </main>
      <ScenarioSwitcher />
    </div>
  )
}
