import { Layout as BaseLayout, LayoutProps } from './Layout';
import { Actions } from './Actions';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { Page } from './Page';
import { Layout } from './Layout';
import { Sidesheet } from './Sidesheet';
import * as Svg from './Svg';

import { layoutReducer } from './layoutReducer';

type LayoutCompound = typeof BaseLayout & {
    Actions: typeof Actions;
    Breadcrumbs: typeof Breadcrumbs;
    Header: typeof Header;
    Menu: typeof Menu;
    MenuItem: typeof MenuItem;
    Page: typeof Page;
    Layout: typeof Layout;
    Sidesheet: typeof Sidesheet;
    Svg: typeof Svg;
};

const CoredevLayout = BaseLayout as LayoutCompound;

CoredevLayout.Actions = Actions;
CoredevLayout.Breadcrumbs = Breadcrumbs;
CoredevLayout.Header = Header;
CoredevLayout.Menu = Menu;
CoredevLayout.MenuItem = MenuItem;
CoredevLayout.Page = Page;
CoredevLayout.Layout = Layout;
CoredevLayout.Sidesheet = Sidesheet;
CoredevLayout.Svg = Svg;

CoredevLayout.Actions.displayName = 'CoredevLayout.Actions';
CoredevLayout.Breadcrumbs.displayName = 'CoredevLayout.Breadcrumbs';
CoredevLayout.Header.displayName = 'CoredevLayout.Header';
CoredevLayout.Menu.displayName = 'CoredevLayout.Menu';
CoredevLayout.MenuItem.displayName = 'CoredevLayout.MenuItem';
CoredevLayout.Page.displayName = 'CoredevLayout.Page';
CoredevLayout.Layout.displayName = 'CoredevLayout.Layout';
CoredevLayout.Sidesheet.displayName = 'CoredevLayout.Sidesheet';

export { CoredevLayout, layoutReducer };

// TODO: Add more types to export
export type { LayoutProps };
