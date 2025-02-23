echo "Playwright tests:"
(cd jero-testing; npx playwright test)
# npx testcafe chrome:headless jero-testing/userStoryTesting/english/navbar/guestDropdown.js

if [ $? -eq 1 ]; then
    echo "Playwright tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "Playwright tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"

fi




echo "Jest Tests:"
(cd jero-frontend; npm run test)

if [ $? -eq 1 ]; then
    echo "jest tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "Jest tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"
fi
# echo "Proceed with commit. \ (•◡•) /"
# exit 0


echo "Unit tests"
(cd jero-backend/demo/demo; mvn test)

if [ $? -eq 1 ]; then
    echo "unit tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "unit tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"
fi


echo "Rest assured tests"
(cd jero-testing/restAssuredTests/my-app; mvn test)

if [ $? -eq 1 ]; then
    echo "rest assured tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "rest assured tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"
fi

echo "Proceed with commit. \ (•◡•) /"
exit 0

