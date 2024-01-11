import { Checkbox } from "@chakra-ui/react";

export function ColorSelect ({checked, onChange, label, id}) {
    return (
        <Checkbox
            aria-labelledby={id}
            className="form-check-input"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        >
            {label}
        </Checkbox>
    )
}