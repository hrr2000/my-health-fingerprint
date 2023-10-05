import { useTranslation } from "next-i18next"

export default function useSafeTranslation(): Function {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { t } = useTranslation("common")

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return t 
}