/**
 * Form integration hooks for React Hook Form and Formik
 */
import { useForgeComponent } from './useForgeComponent';

// React Hook Form integration helper
// Note: This hook has been deprecated in favor of the RHF adapter components
// Use RHFForgeInput, RHFForgeSelect, etc. from '@nexcraft/forge-rhf' instead
export function useForgeReactHookForm(name: string, _control: any) {
  console.warn(
    '@nexcraft/forge-react: useForgeReactHookForm is deprecated. ' +
    'Use RHFForgeInput, RHFForgeSelect, etc. adapter components instead for better reliability. ' +
    'Import them from "@nexcraft/forge-rhf"'
  );
  
  // Return a basic placeholder that works but encourages migration
  const { ref } = useForgeComponent();
  
  return {
    ref,
    name,
    value: '',
    onChange: () => {
      console.warn('useForgeReactHookForm: Please use RHF adapter components instead');
    },
    onBlur: () => {},
    error: 'Please use RHF adapter components (RHFForgeInput, RHFForgeSelect, etc.) instead',
    invalid: false,
    required: false,
    disabled: false
  };
}

// Formik integration helper
export function useForgeFormik(name: string, formik: any) {
  const value = formik.values[name];
  const error = formik.errors[name];
  const touched = formik.touched[name];

  const { ref } = useForgeComponent();

  // Note: This is a simplified version. For full functionality,
  // you may want to implement useForgeControlled from the original
  
  return {
    ref,
    name,
    value,
    error: touched ? error : undefined,
    onBlur: () => formik.setFieldTouched(name, true),
  };
}