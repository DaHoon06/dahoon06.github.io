import { IntroPanel } from "@entities/portpolio/introduce/ui/IntroPanel";
import Cursor from "@shared/ui/cursor";
import { HomeLayout } from "@widgets/layouts";

export default function MePage() {
    return (
        <HomeLayout>
            <div>
                <IntroPanel />
            </div>
            <Cursor />
        </HomeLayout>
    );
}
