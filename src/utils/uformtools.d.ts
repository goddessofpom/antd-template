export interface FormEffectsParams {
  setFieldState: Function;
  getFieldState?: Function;
}

export interface FormStateProps {
  props: { enum?: Array<number> };
  value?: any;
}
