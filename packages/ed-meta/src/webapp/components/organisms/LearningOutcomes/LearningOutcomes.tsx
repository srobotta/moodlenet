import {
  Dropdown,
  ErrorMessage,
  InputTextField,
  RoundButton,
  SimpleTextOption,
} from '@moodlenet/component-library'
import { Circle, HelpOutline } from '@mui/icons-material'
import type { RefObject } from 'react'
import { createRef, useEffect, useState, type FC } from 'react'
import { t } from '@moodlenet/react-app/webapp'
import type { LearningOutcome, LearningOutcomeOption } from '../../../../common/types.mjs'
import './LearningOutcomes.scss'

export type LearningOutcomesProps = {
  isEditing: boolean
  learningOutcomes: LearningOutcome[]
  learningOutcomeOptions: LearningOutcomeOption[]
  disabled?: boolean
  error?: string | string[]
  shouldShowErrors: boolean
  edit: (learningOutcomes: LearningOutcome[]) => unknown
}

const MAX_LEARNING_OUTCOME_ITEMS = 4
function getBloomClassName(bloomCode: string) {
  return (
    {
      '1': 'knowledge',
      '2': 'comprehension',
      '3': 'application',
      '4': 'analysis',
      '5': 'synthesis',
      '6': 'evaluation',
    }[bloomCode] ?? ''
  )
}

export const LearningOutcomes: FC<LearningOutcomesProps> = ({
  learningOutcomeOptions,
  learningOutcomes,
  isEditing,
  disabled,
  error,
  shouldShowErrors,
  edit,
}) => {
  const deleteOutcome = (index: number) => {
    edit(learningOutcomes.filter((_, i) => i !== index))
  }

  const learningOutcomesList = learningOutcomes.length > 0 && (
    <div className="learning-outcomes-list" key="learning-outcomes-list">
      {learningOutcomes.map(({ code, verb, sentence }, i) => {
        const learningOutcomeName = getLearningOutcomeName(code)
        const bloomUIClassName = getBloomClassName(code)
        return isEditing ? (
          <InputTextField
            className="learning-outcome"
            key={`${code}-${verb}-${i}`}
            name="content"
            placeholder={t('the_necessary_facts')}
            edit
            disabled={disabled}
            value={sentence}
            onChange={value => {
              const newLearningOutcomes = [...learningOutcomes]
              const newLearningOutcome = newLearningOutcomes[i]
              if (!newLearningOutcome) {
                return
              }
              newLearningOutcome.sentence = value.target.value
              edit(newLearningOutcomes)
            }}
            defaultValue={sentence}
            leftSlot={
              <abbr
                className={`verb-pill ${bloomUIClassName}`}
                title={`${learningOutcomeName} Bloom's category`}
              >
                {verb}
              </abbr>
            }
            rightSlot={
              <RoundButton
                onClick={() => deleteOutcome(i)}
                tabIndex={0}
                disabled={disabled}
                abbrTitle={t('remove_learning_outcome')}
                onKeyUp={e => e.key === 'enter' && deleteOutcome(i)}
              />
            }
            error={
              shouldShowErrors && isEditing && Array.isArray(error) && error[i] !== ''
                ? error[i]
                : undefined
            }
          />
        ) : (
          sentence !== '' && (
            <div className="learning-outcome-read-only">
              <Circle />
              <abbr
                className={`verb ${bloomUIClassName}`}
                title={`${learningOutcomeName} Bloom's category`}
              >
                {verb}
              </abbr>{' '}
              <div className="sentence">{sentence}</div>
            </div>
          )
        )
      })}
    </div>
  )

  const [searchText, setSearchText] = useState('')

  const learningOutcomeCategoriesRefs: RefObject<HTMLDivElement>[] = learningOutcomeOptions.map(
    () => createRef(),
  )

  const categories = isEditing && (
    <div className="categories">
      {learningOutcomeOptions.map((learningOutcomeOption, i) => {
        const selectedVerb = learningOutcomes.find(
          outcome => outcome.code === learningOutcomeOption.code,
        )
        const dropdownRef = learningOutcomeCategoriesRefs && learningOutcomeCategoriesRefs[i]
        const maxLearningOutcomesReached = learningOutcomes.length > MAX_LEARNING_OUTCOME_ITEMS
        return (
          <Dropdown
            key={learningOutcomeOption.code}
            divRef={dropdownRef}
            className={`category ${getBloomClassName(learningOutcomeOption.code)} ${
              selectedVerb ? 'active' : ''
            }
        ${maxLearningOutcomesReached ? 'max-reached' : ''}`}
            pills={false}
            disabled={maxLearningOutcomesReached || disabled}
            abbr={
              maxLearningOutcomesReached ? {t('max_learning_outcomes_reached')} : {t('add_learning_outcome')}
            }
            placeholder={learningOutcomeOption.name}
            searchByText={setSearchText}
            onChange={changeEvent => {
              edit([
                ...learningOutcomes,
                {
                  code: learningOutcomeOption.code,
                  verb: changeEvent.target.value,
                  sentence: '',
                },
              ])
            }}
            edit
          >
            {learningOutcomeOption.verbs
              .filter(verb => verb.toUpperCase().includes(searchText.toUpperCase()))
              .map(verb => {
                return <SimpleTextOption key={verb} value={verb} />
              })}
          </Dropdown>
        )
      })}
    </div>
  )

  useEffect(() => {
    learningOutcomeCategoriesRefs.forEach(ref => {
      const element = ref.current
      if (element) element.style.width = `${ref.current?.clientWidth}px`
    })
  }, [learningOutcomeCategoriesRefs])

  const findOutMore = (
    <abbr className="find-out-more" title="{t('find_out_more')}">
      <a
        href="https://en.wikipedia.org/wiki/Bloom%27s_taxonomy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HelpOutline />
      </a>
    </abbr>
  )

  const title = (
    <div className="title">
      {t('learning_outcomes')}
      {findOutMore}
    </div>
  )

  const subtitle = (
    <div className="subtitle">
      {isEditing
        ? {t('learning_outcomes_sub_line1')}
        : {t('learning_outcomes_sub_line2')}}
    </div>
  )

  const errorDiv = isEditing && shouldShowErrors && error && typeof error === 'string' && (
    <ErrorMessage error={error} />
  )

  return (
    <div className={`learning-outcomes-section ${disabled ? 'disabled' : ''}`}>
      {title}
      {errorDiv}
      {subtitle}
      {categories}
      {learningOutcomesList}
    </div>
  )
  function getLearningOutcomeName(byCode: string) {
    return learningOutcomeOptions.find(({ code }) => code === byCode)?.name ?? 'N/A'
  }
}

LearningOutcomes.displayName = 'LearningOutcomes'
