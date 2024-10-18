import clsx from 'clsx';
import { CSSProperties, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
	ArticleParamsForm,
	defaultState,
} from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';

import styles from './styles/index.module.scss';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageState, setPageState] = useState(defaultState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamily,
					'--font-size': pageState.fontSize,
					'--font-color': pageState.fontColor,
					'--container-width': pageState.contentWidth,
					'--bg-color': pageState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageState={setPageState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
