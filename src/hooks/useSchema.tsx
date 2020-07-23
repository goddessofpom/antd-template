import { ISchema } from '@uform/next';

interface PropsItem {
  name: string;
  data: any;
}

const useSchema = (jsonSchema: ISchema) => {
  const schema = jsonSchema;

  const setProperty = (name: string, data: any) => {
    if (schema.properties) {
      schema.properties[name] = data;
    }
  };

  const setProperties = (props: Array<PropsItem> | PropsItem) => {
    if (Array.isArray(props)) {
      props.map((item) => {
        setProperty(item.name, item.data);
        return item;
      });
    } else {
      setProperty(props.name, props.data);
    }
  };

  return { schema, setProperties };
};

export default useSchema;
