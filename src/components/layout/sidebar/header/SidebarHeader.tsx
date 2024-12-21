import { Menu, SquarePlay } from 'lucide-react'

export function SidebarHeader() {
	return (
		<div>
			<button>
				<Menu />
			</button>
			<span>
				<SquarePlay />
				<span>Youtube 2.0</span>
			</span>
		</div>
	)
}
