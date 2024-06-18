-- Initialize the owner and the whitelist
OWNER = "B0Bs8S0iXXBd6esAEKEPq9WnztqrzBoOVw78bYGe_YQ"
WHITELISTED_ADDRESS = WHITELISTED_ADDRESS or {}

-- Handler to add a process ID to the whitelist
Handlers.add(
    "InsertProcess",
    Handlers.utils.hasMatchingTag("Action", "Insert-Process"),
    function(msg)
        if msg.From == OWNER then
            local recipient = msg.Tags.Recipient
            local amount = msg.Tags.Amount
            if WHITELISTED_ADDRESS[recipient] then
                WHITELISTED_ADDRESS[recipient] = WHITELISTED_ADDRESS[recipient] + amount
                WHITELISTED_ADDRESS[recipient] = tostring(WHITELISTED_ADDRESS[recipient])
                if WHITELISTED_ADDRESS[recipient]:sub(-2) == ".0" then
                    WHITELISTED_ADDRESS[recipient] = WHITELISTED_ADDRESS[recipient]:sub(1,-3)
                end
            else
                WHITELISTED_ADDRESS[recipient] = amount
            end
        else
            Handlers.utils.reply("Unauthorized Access!")
            print("Unauthorized Access!")
        end
    end
)

-- Handler to send tokens to all addresses in the whitelist
Handlers.add(
    "SendTokens",
    Handlers.utils.hasMatchingTag("Action", "Send-Tokens"),
    function(msg)
        if (WHITELISTED_ADDRESS[msg.From]) then
            print(msg.From .. " " .. WHITELISTED_ADDRESS[msg.From])
            local quantity = WHITELISTED_ADDRESS[msg.From]
            WHITELISTED_ADDRESS[msg.From] = nil
            -- Transfer tokens
            ao.send({
                Target = "eNf324kIQ5qD3HBvIuVHUjeOIOu8ybknj09yGovbZjA",
                Action = "Transfer",
                Recipient = msg.From,
                Quantity = quantity,
            })
        else
            Handlers.utils.reply("Not Eligible to Receive Tokens OR Already Claimed")(msg)
            end
    end
)