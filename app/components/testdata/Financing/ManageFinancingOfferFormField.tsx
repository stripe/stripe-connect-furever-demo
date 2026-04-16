import {UseFormReturn} from 'react-hook-form';
import {TestmodeFinancingForm} from './types';
import {FormField, FormItem, FormLabel} from '@/components/ui/form';

export const ManageFinancingOfferFormField = ({
  name,
  label,
  form,
  loading,
  render: renderField,
}: {
  name: keyof TestmodeFinancingForm;
  label: React.ReactNode;
  form: UseFormReturn<TestmodeFinancingForm>;
  loading: boolean;
  render: Parameters<typeof FormField<TestmodeFinancingForm>>[0]['render'];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={(renderProps) => (
        <>
          <FormItem
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormLabel
              style={{
                flexWrap: 'wrap',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {label}
            </FormLabel>
            {renderField(renderProps)}
          </FormItem>
        </>
      )}
    />
  );
};
