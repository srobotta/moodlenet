import { FormikConfig, useFormik } from 'formik'
import { useMemo } from 'react'
import { FormBag } from '../@types/types'

export const useFormikWithBag = <Values>(cfg: FormikConfig<Values>) => {
  const formik = useFormik<Values>(cfg)
  const bag = useMemo<FormBag<Values>>(() => {
    return {
      ...formik,
      valueName: Object.entries(formik.values).reduce<FormBag<Values>['valueName']>((collect, [name, value]) => {
        return {
          ...collect,
          [name]: {
            name,
            value,
          },
        }
      }, {} as any),
    }
  }, [formik])

  return [formik, bag] as const
}