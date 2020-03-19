import { useState, ChangeEvent } from 'react';

export function useFormState<T>(
    initialValue: T
): [T, ({ target }: ChangeEvent<HTMLInputElement>) => void] {
    const [formValue, setFormValue] = useState<T>(initialValue);

    const handleInputChange = ({
        target,
    }: ChangeEvent<HTMLInputElement>): void => {
        if (target?.name) {
            console.log(target.type);
            setFormValue({
                ...formValue,
                [target.name]:
                    target?.type === 'number'
                        ? parseInt(target.value)
                        : target.value,
            });
        }
    };

    return [formValue, handleInputChange];
}
