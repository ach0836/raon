"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";

// 비밀번호만 필요한 로그인 폼 스키마 정의
const loginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

export default function Login() {
  const router = useRouter();
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const showToast = (message, type) => {
    toast[type](message, {
      style: {
        width: "300px",
        height: "100px",
      },
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        setIsFormDisabled(false);
        form.reset(); // 폼 초기화
      },
    });
  };

  const onSubmit = async (data) => {
    setIsFormDisabled(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast("로그인 성공", "success");
        router.push("/dashboard"); // 로그인 성공 시 대시보드로 리디렉션
      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showToast("로그인 실패", "error");
    }
  };

  const handleNumberClick = (number) => {
    const currentPassword = form.getValues("password");
    form.setValue("password", currentPassword + number);
  };

  const handleBackspaceClick = () => {
    const currentPassword = form.getValues("password");
    form.setValue("password", currentPassword.slice(0, -1));
  };

  const { isSubmitting } = form.formState;

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-8 m-12 min-h-[400px] flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col items-center justify-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Label className="text-2xl mb-4">로그인</Label>
            <div className="flex items-start mb-4 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="password" className="block mb-1">
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="비밀번호"
                        type="password"
                        className="text-lg w-full"
                        {...field}
                        disabled={isSubmitting || isFormDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="text-lg p-2"
                    disabled={isSubmitting || isFormDisabled}
                  >
                    {number}
                  </Button>
                ))}
                <Button
                  type="button"
                  onClick={() => handleNumberClick("0")}
                  className="text-lg p-2 col-span-2"
                  disabled={isSubmitting || isFormDisabled}
                >
                  0
                </Button>
                <Button
                  type="button"
                  onClick={handleBackspaceClick}
                  className="text-lg p-2"
                  disabled={isSubmitting || isFormDisabled}
                >
                  ⌫
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="text-lg mt-4"
              disabled={isSubmitting || isFormDisabled}
            >
              로그인
            </Button>
          </form>
        </Form>
      </Card>
      <ToastContainer />
    </main>
  );
}
