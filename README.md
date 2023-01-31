# Magic Mouse

This is a lightweight React library to create an amazing mouse pointer for awsome website.

### Demo

Here you can try all the props with a Data GUI interface and a simple link text

[See the Demo](https://magic-mouse.vercel.app/)

### How to use
---


```node
yarn add magic-mouse
```
or 
```node
npm instal magic-mouse
```

The import in one of the wrapper component of the webapp, like App or index

```js
import MagicMouse from 'magic-mouse'

const App = ()=>{
	return (
		<wrapperComponent>
			<MagicMouse />
		</wrapperComponent>
	)
}
```

### Props
---

It is possible to customize the pointer behaviour


| Props  | Type (all optionals) | Default | Options | Description |
| ------ | ---- | ------- | ------- | ----------- |
| type | string | 'light' | 'light' 'dark' 'custom' | Use
| pointerColor | string | none | es: #ff0000 | Use a custom color for the pointer. It works only if the type is custom |
| outlineColor | string | none | es: #ff0000 | Use a custom color for the outline. It works only if the type is custom |
| hoverBackground | string | 'transparent' | es: #fg66789 | Use a custom color for the background when the pointer is over a link |
| showCursor | boolean | false | true/false | show the cursor over the pointer | 
| circleWidth | number | `8` | es: `16` | Customize the width of the pointer circle in `px` |
| outlineWidth | number | `64` | es: `100` | Customize the width of the outline in `px` |
| circleWidthHover | number | `150` | es: `200` | Customize the width of the outline in `px` when the pointer is over a link |
| useSvgOnHover | boolean | false | true/false | Use a svg pointer instead the circle when the pointer is over a link |
| svg | string | arrow Right | es '../square.svg' | Use a custom svg pointer. It works only the the useSvgOnHover is true |

