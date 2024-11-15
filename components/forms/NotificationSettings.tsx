"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

const notificationFormSchema = z.object({
  directMessages: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  socialEmails: z.boolean().default(true),
  securityEmails: z.boolean().default(true),
  communicationEmails: z.boolean().default(true),
  mobileSettings: z.boolean().default(false),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export function NotificationSettings() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      directMessages: true,
      marketingEmails: false,
      socialEmails: true,
      securityEmails: true,
      communicationEmails: true,
      mobileSettings: false,
    },
  })

  function handleSubmit(data: NotificationFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-tight">
                Choose what to receive
              </h3>
              <Separator />
              
              <FormField
                control={form.control}
                name="directMessages"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium leading-none">
                        Direct messages
                      </FormLabel>
                      <FormDescription className="text-[0.8rem] text-muted-foreground">
                        Receive notifications about direct messages and mentions
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-base font-semibold tracking-tight">
                  Email Notifications
                </h3>
                <Separator />

                <FormField
                  control={form.control}
                  name="communicationEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium leading-none">
                          Communication emails
                        </FormLabel>
                        <FormDescription className="text-[0.8rem] text-muted-foreground">
                          Receive emails about your account activity
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium leading-none">
                          Marketing emails
                        </FormLabel>
                        <FormDescription className="text-[0.8rem] text-muted-foreground">
                          Receive emails about new products, features, and more
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium leading-none">
                          Social emails
                        </FormLabel>
                        <FormDescription className="text-[0.8rem] text-muted-foreground">
                          Receive emails for friend requests, follows, and more
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium leading-none">
                          Security emails
                        </FormLabel>
                        <FormDescription className="text-[0.8rem] text-muted-foreground">
                          Receive emails about your account security
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mobileSettings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium leading-none">
                        Use different settings for my mobile devices
                      </FormLabel>
                      <FormDescription className="text-[0.8rem] text-muted-foreground">
                        You can manage your mobile notifications in the mobile settings page
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="font-medium">
          Update notifications
        </Button>
      </form>
    </Form>
  )
} 