"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Dein Name sollte aus mindestens 2 Buchstaben bestehen.",
  }),
  username: z.string()
    .min(2, {
      message: "Dein Username sollte aus mindestens 2 Buchstaben bestehen.",
    })
    .regex(/^@/, {
      message: "Der Username muss mit @ beginnen.",
    }),

})


export default function Home() {

  /// Validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
    },
  })

  const { toast } = useToast()

  /// Submit Logic
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("pressed", values)
    toast({
      title: "Du hast folgende Daten abgeschickt:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  /// 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-48">
      <Tabs defaultValue="account" className="w-[360px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Konto</TabsTrigger>
          <TabsTrigger value="password">Passwort</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Konto</CardTitle>
              <CardDescription>
                Verändere deine Kontoangaben. Sicher sie, sobald du fertig bist.
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <FormControl>
                            <Input placeholder="Tim" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <FormControl>
                            <Input placeholder="@Thoxh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              <CardFooter>
                  <Button type="submit">Speichern</Button>
                </CardFooter>
                </form>
            </Form>
            <Toaster />
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Verändere dein Passwort. Sobald du die Änderung sicherst, wirst du ausgeloggt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Aktuelles Passwort</Label>
                <Input disabled id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Neues Passwort</Label>
                <Input disabled id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled>Passwort ändern</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
    </main >
  )
}


