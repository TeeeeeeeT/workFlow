import Form, { useForm } from './form';
import FormItem from './formItem';

type InternalFormType = typeof Form;
type CompoundedComponent = InternalFormType & {
    useForm: typeof useForm;
    Item: typeof FormItem;
};

const Temp = Form as CompoundedComponent;
Temp.useForm = useForm;
Temp.Item = FormItem;

export default Temp;