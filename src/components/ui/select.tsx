import * as React from "react"

const SelectContext = React.createContext<{ value: any; onValueChange: any; open?: boolean; setOpen?: any }>({ value: null, onValueChange: () => {} });

const Select = React.forwardRef<HTMLDivElement, { value: any, onValueChange: any, children: React.ReactNode }>(({ value, onValueChange, children }, ref) => {
   return (
     <SelectWrapper value={value} onValueChange={onValueChange} ref={ref}>
         {children}
     </SelectWrapper>
   )
})
Select.displayName = "SelectWrapperProxy"

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  return (
      <SelectContextConsumer>
        {({ open, setOpen }: any) => (
             <button
                ref={ref}
                onClick={() => setOpen(!open)}
                className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                {...props}
             >
                {children}
             </button>
        )}
      </SelectContextConsumer>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<HTMLSpanElement, { placeholder?: string }>(({ placeholder }, ref) => {
  const { value } = React.useContext(SelectContext);
  return <span ref={ref}>{value === 'classic' ? "Classic Tic Tac Toe" : value === 'ultimate' ? "Ultimate Tic Tac Toe" : placeholder}</span>
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children }, ref) => {
    return (
        <SelectContextConsumer>
            {({ open }: any) => (
                open ? (
                    <div ref={ref} className="absolute top-12 left-0 w-full bg-popover text-popover-foreground border rounded-md shadow-md z-50 p-1 min-w-[8rem] animate-in fade-in zoom-in-95 duration-200">
                        {children}
                    </div>
                ) : null
            )}
        </SelectContextConsumer>
    )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLDivElement, { value: any } & React.HTMLAttributes<HTMLDivElement>>(({ value, children, className, ...props }, ref) => {
   const { onValueChange, setOpen } = React.useContext(SelectContext) as any;
   return (
       <div
         ref={ref}
         onClick={() => { onValueChange(value); setOpen(false); }}
         className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
         {...props}
       >
           {children}
       </div>
   )
})
SelectItem.displayName = "SelectItem"

// Helper to provide context with state
const SelectWrapper = React.forwardRef<HTMLDivElement, any>(({ value, onValueChange, children }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
        <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
            <div ref={ref} className="relative inline-block">{children}</div>
        </SelectContext.Provider>
    )
})
SelectWrapper.displayName = "Select"

const SelectContextConsumer = ({ children }: any) => {
    const context = React.useContext(SelectContext);
    return children(context);
}

export { SelectWrapper as Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
