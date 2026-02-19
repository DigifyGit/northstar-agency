# IT Skills & Knowledge Test — Windows-only + AD (Employer-style)

**Date:** 2026-01-30
**Environment:** Windows-only + on-prem Active Directory (classic corporate)
**Source:** Jose responses in chat (took ~2 hours)

---

## PART A — Tickets (Jose answers)

### T1 — Account lockout (domain)
**Priority:** P1-P2
**Questions:**
- Do you remember your password?
- How many times did you try to login with your password?
- Did you login with the correct username?
- Did you try to login to the domain user or to the local user?
- Did you get any notification?
**First actions:**
- Check if the user locked in the AD
- Remove the block in the AD
- Ask the user to login
- If not working, reset the user password
- Ask the user to try login again
**Escalate when:**
- Not sure if L1 has access to the AD
**Ticket note:**
- The users was locked, the user forgot his password, I reset the password in the AD and the user was able to login again.

### T2 — Password expired / change required
**Priority:** P1-P2
**Questions:**
- Did you enter the old password correctly?
- Did you use the required new passwords policy such as letters, numbers and signs?
- Is the keyboard on the correct language?
**First actions:**
- Check if the user is Locked
- Check if the user has the change password settings enabled
- Reset/Change the user password in the AD or any ADMIN panel
**Escalate when:**
- I don’t have permissions to change the password for the user (As L1 supporter)
**Ticket note:**
- The users couldn’t change the password, he wasn’t using the correct password policy, I instructed him and he was able to change the password.

### T3 — Can’t access file share
**Priority:** P2
**Questions:**
- Did you login with the correct user?
- Do you have access to other shared folders?
- Was there any popup for password when you tried?
- Is the internet cable connected? Do you have internet?
- Do you need to use a VPN? Is the VPN connected?
**First actions:**
- Ask the user to logoff and login again and check
- Check the group policy or shared folder permissions in the server side
- Add the user permissions to access the shared folder
**Escalate when:**
- I don’t have access to set/change shared folders permissions in the Server
**Ticket note:**
- The user was not able to open the shared folder. It wasn’t having permissions to view the folder, I added him to the folder permissions and then he was able to view the folder.

### T4 — Mapped drive missing
**Priority:** P2
**Questions:**
- Did you try to logout and login again?
- Are you logged in the correct user?
- Where you don’t see it? Is that a shortcut on the Desktop that is gone?
- When you press on my computer or networks, do you see it there?
**First actions:**
- Connect to the computer with the user credentials remotely or physically and add the mapping again (Jose notes he doesn’t remember exact steps)
**Escalate when:**
- I am not able to configure the network drive for the user
**Ticket note:**
- The network drive mapping was missing, I logged in to his computer remotely and added the network drive again.

### T5 — Printer offline
**Priority:** P2
**Questions:**
- Are you able to print from a different computer in the office?
- Is the printer ON?
- Is the printer cable connected?
- Do you see lights from the printer port working?
**First actions:**
- Ask the user to try to print from a different computer while I try to fix it
- Ask to check printer error states (paper jam/ink/etc.)
- Ping the printer to check if it’s online
- Try to login to the printer to check what is the problem
- Connect to the user computer to reconfigure / set Offline→Online / check services
**Escalate when:**
- No ping, printer appears on, cable connected, lights blinking, no errors
**Ticket note:**
- User wasn’t able to print from his desk; he was able to print from a different computer; I needed to login to his computer to reconfigure/fix the printer drivers.

### T6 — VPN connected but no internal access
**Priority:** P2
**Questions:**
- Did you try to disconnect and reconnect again?
- Are you using your default internet/AP or a different place (coffee shop)?
- Can you try a different Wi‑Fi/AP?
**First actions:**
- Try to use the user VPN from my computer to check if it’s working
- Ping server IP
- Run ipconfig to check default gateway
- Check if computer is getting an IP address from the VPN
- Login to the user computer to check settings; reconfigure VPN
**Escalate when:**
- I tried but couldn’t fix it
**Ticket note:**
- Checked but could not identify the problem. (Jose note: doesn’t remember correct VPN troubleshooting.)

---

## PART B — Rapid fire (Jose answers)

R1) DNS — Domain Name Servers translate between names and numbers; resolve google.com to IP.

R2) DHCP — Provides IP addresses automatically/static; supplies gateway; can reserve by MAC; range configuration.

R3) Default gateway — Router/bridge to internet; without it only local network.

R4) 169.254.x.x — APIPA; no DHCP lease; device not connected; can test static IP.

R5) TCP vs UDP — I don’t know.

R6) IP config command — ipconfig (only).

R7) DNS resolution command — Don’t remember; maybe ping or nslookup.

R8) Ping — tests connectivity/quality (latency, packet loss).

R9) Share vs NTFS permissions — No idea; guesses NTFS local, share network based.

R10) Account lockout causes — password expired / wrong password multiple times.

R11) AD security group — doesn’t remember; guesses permissions/roles; mixes with GPO.

R12) VPN connected but nothing works — doesn’t remember; guesses blocking/ports/app/settings/cert; would try ping.
