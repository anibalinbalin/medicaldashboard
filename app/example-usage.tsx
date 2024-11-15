import { DatePicker } from "@/components/ui/date-picker"

export function ExampleForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="dob">Date of birth</label>
        <DatePicker 
          onSelect={(date) => console.log(date)} 
          placeholder="Select your birth date"
        />
      </div>
    </div>
  )
} 