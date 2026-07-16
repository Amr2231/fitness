import { Button } from "./button";
import { Input } from "./input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { Spinner } from "./spinner";
import { PasswordInput } from "./password-input";
import { User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Field, FieldContent, FieldLabel, FieldTitle } from "./field";
import { NumberPicker } from "./number-picker";
import { useForm, Controller } from "react-hook-form";
import SmartCoach from "./chat-bot/chat-bot";

export default function DesignSystemComponents() {
  const { control, handleSubmit } = useForm({
    defaultValues: { age: 20 },
  });

  const onSubmit = (data: { age: number }) =>
    console.log("Data to Backend:", data);

  return (
    <>
      {/* How to use number Picker */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10  mx-96">
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <NumberPicker
              min={12}
              max={80}
              unit="Years Old"
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit" className="w-full m-auto">
          Click and check console for submitted data
        </Button>
      </form>
      <RadioGroup defaultValue="plus" className="max-w-sm">
        <FieldLabel htmlFor="plus-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Plus</FieldTitle>
            </FieldContent>
            <RadioGroupItem value="plus" id="plus-plan" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="pro-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Pro</FieldTitle>
            </FieldContent>
            <RadioGroupItem value="pro" id="pro-plan" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="enterprise-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Enterprise</FieldTitle>
            </FieldContent>
            <RadioGroupItem value="enterprise" id="enterprise-plan" />
          </Field>
        </FieldLabel>
      </RadioGroup>

      <div className="p-10 text-center font-sans">
        <h1 className="text-6xl font-extrabold tracking-tight font-baloo">
          test <span className="text-primary font-extrabold">FITNESS</span>
        </h1>
        <p className="text-xl mt-4 font-medium opacity-80">test fonts</p>
        <div className="w-full flex flex-col gap-10">
          <Button> Default Button </Button>
          <Button variant={"outline"}> Outline Button </Button>

          {/* normal input */}
          <Input placeholder="Normal Input" />

          {/* icon Input */}
          <Input placeholder="Icon Input" className="mt-5" icon={<User />} />

          {/* OTP Input */}
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          {/* Password Input */}
          <PasswordInput placeholder="Password Input *****************" />

          {/* Spinner */}
          <Spinner />
        </div>
      </div>
    </>
  );
}
