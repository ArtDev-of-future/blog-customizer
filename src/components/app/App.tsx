import { CSSProperties, useState } from 'react';

import { Article } from '../../components/article';
import styles from '../../styles/index.module.scss';
import '../../styles/index.scss';
import { ArticleParamsForm } from '../article-params-form';
import { defaultState } from '../article-params-form/ArticleParamsForm';
export const App = () => {
	const [pageState, setPageState] = useState(defaultState);

	return (
		<main
			className={styles.main}
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
