### GITHero Telegram bot

`./config.json`:
```json
{
    "teleToken": "<token>",
    "hostname": "domain where bot is located",
    "port": "port"
}
```

`chatIds` - empty file

`post-receive` - git hook
```bash
#!/bin/sh

while read oldrev newrev refname
do
	username=$(git log -1 --format=format:%an HEAD)
	branch=$(git rev-parse --symbolic --abbrev-ref $refname)
	count=$(git rev-list HEAD ^$oldrev --count)
	reponame=$(basename `pwd`)
	additional=$(git log --format='%h %s'  HEAD...$oldrev)

	curl -G -v "http://<hostname>:<port>/" \
		--data-urlencode "username=$username" \
		--data-urlencode "branch=$branch" \
		--data-urlencode "count=$count" \
		--data-urlencode "reponame=$reponame" \
		--data-urlencode "additional=$additional"
done
```