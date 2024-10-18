import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
type ArticleState = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	contentWidth: string;
	backgroundColor: string;
};
export const defaultState = {
	fontFamily: defaultArticleState.fontFamilyOption.value,
	fontSize: defaultArticleState.fontSizeOption.value,
	fontColor: defaultArticleState.fontColor.value,
	contentWidth: defaultArticleState.contentWidth.value,
	backgroundColor: defaultArticleState.backgroundColor.value,
};

export const ArticleParamsForm = ({
	setPageState,
}: {
	setPageState: (state: ArticleState) => void;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(defaultState);
	const resetForm = () => {
		setFormState(defaultState);
		setPageState(defaultState);
	};
	const sidebarRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			window.addEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			document.removeEventListener('keydown', handleEsc);
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={sidebarRef}>
				<form className={styles.form}>
					<Text as='h2' size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={
							fontFamilyOptions.find(
								(option) => option.value === formState.fontFamily
							) ?? fontFamilyOptions[0]
						}
						options={fontFamilyOptions}
						title='цвет шрифта'
						onChange={(option: OptionType) =>
							setFormState({
								...formState,
								fontFamily: option.value,
							})
						}
					/>
					<RadioGroup
						name='font'
						options={fontSizeOptions}
						selected={
							fontSizeOptions.find(
								(option) => option.value === formState.fontSize
							) ?? fontSizeOptions[0]
						}
						title='размер шрифта'
						onChange={(option: OptionType) =>
							setFormState({
								...formState,
								fontSize: option.value,
							})
						}
					/>
					<Select
						selected={
							fontColors.find(
								(option) => option.value === formState.fontColor
							) ?? fontColors[0]
						}
						options={fontColors}
						title='цвет шрифта'
						onChange={(option: OptionType) =>
							setFormState({ ...formState, fontColor: option.value })
						}
					/>
					<Separator />
					<Select
						selected={
							backgroundColors.find(
								(option) => option.value === formState.backgroundColor
							) ?? backgroundColors[0]
						}
						options={backgroundColors}
						title='цвет фона'
						onChange={(option: OptionType) =>
							setFormState({ ...formState, backgroundColor: option.value })
						}
					/>
					<Select
						selected={
							contentWidthArr.find(
								(option) => option.value === formState.contentWidth
							) ?? contentWidthArr[0]
						}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(option: OptionType) =>
							setFormState({
								...formState,
								contentWidth: option.value,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={() =>
								setPageState({
									fontFamily: formState.fontFamily,
									fontSize: formState.fontSize,
									fontColor: formState.fontColor,
									contentWidth: formState.contentWidth,
									backgroundColor: formState.backgroundColor,
								})
							}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
