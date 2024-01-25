export interface IFeatureData<T> {
  data: T | null
  isLoading: boolean
  errors: string[] | undefined
}
